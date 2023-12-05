import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  CSSProperties,
} from "react";
import { Book, Rendition } from "epubjs";
// style
import styles from "../../modules/epubViewer/styles";
// types
import { EpubViewerProps, ViewerRef } from "../types";
import Toc from "../types/toc";
import Loc from "../types/loc";

/**
 * EpubViewer Module
 * @class
 * @param props
 * @param props.url Epub path
 * @param props.epubFileOptions Epub file option
 * @param props.epubOptions Epub viewer option
 * @param props.style Epub Wrapper style
 * @param props.location Epub CFI or href
 * @param props.bookChanged Run when book changed
 * @param props.rendtionChanged Run when rendition changed
 * @param props.pageChanged Run when page changed
 * @param props.tocChanged Run when toc changed
 * @param props.selectionChanged Run when selected
 * @param props.loadingView Loading Component
 * @param ref Viewer ref
 */
const EpubViewer = (
  {
    url,
    epubFileOptions,
    epubOptions,
    style,
    location,
    bookChanged,
    rendtionChanged,
    pageChanged,
    tocChanged,
    selectionChanged,
    loadingView,
  }: EpubViewerProps,
  ref: React.RefObject<ViewerRef> | any
) => {
  // TODO Fix the ref type correctly instead 'any' type.
  const viewerStyle: CSSProperties = style ? { ...styles, ...style } : styles;

  const [isLoaded, setIsLoaded] = useState(false);

  const [book, setBook] = useState<Book | null>(null);

  const [rendition, setRendition] = useState<Rendition | null>(null);

  const currentCfi = useRef<string>("");

  /**
   * Move page
   * @method
   * @param type direction
   */
  const movePage = useCallback(
    (type: "PREV" | "NEXT") => {
      if (!rendition) return;
      if (type === "PREV") rendition.prev();
      else rendition.next();
    },
    [rendition]
  );

  /**
   * Move page by arrow key
   * @method
   * @param props Keyboard Event
   * @param props.key
   */
  const handleKeyPress = useCallback(
    ({ key }: any) => {
      key && key === "ArrowLeft" && movePage("PREV");
      key && key === "ArrowRight" && movePage("NEXT");
    },
    [movePage]
  );

  /**
   * Run when location changed
   * @method
   * @param loc
   * - Set location state
   * - Run 'locationChanged()' through startCFI
   */
  const onLocationChange = useCallback(
    (loc: Loc) => {
      const startCfi = loc && loc.start;
      const endCfi = loc && loc.end;
      const base = loc && loc.start.slice(8).split("!")[0];

      if (!book) return;

      const spineItem = book.spine.get(startCfi);
      const navItem = book.navigation.get(spineItem.href);
      const chapterName = navItem && navItem.label.trim();

      const locations: any = book.locations;
      const currentPage = locations.locationFromCfi(startCfi);
      console.log(currentPage, "currentPage11");
      const totalPage = locations.total;
      pageChanged &&
        pageChanged(
          {
            chapterName,
            currentPage,
            totalPage,
            startCfi,
            endCfi,
            base,
          },
          isLoaded
        );

      currentCfi.current = startCfi;
    },
    [book, pageChanged]
  );

  /**
   * Highlight function
   * @param cfiRange Selected CFIRange
   * @param callback Highlight callback function when click it
   * @param color Highlight color
   */
  const onHighlight = useCallback(
    (cfiRange: string, callback?: (e: any) => void, color?: string) => {
      if (!rendition) return;

      rendition.annotations.remove(cfiRange, "highlight");
      rendition.annotations.highlight(
        cfiRange,
        {},
        callback,
        "epub-highlight",
        {
          fill: color || "#fdf183",
        }
      );
    },
    [rendition]
  );

  /**
   * Highlight remove function
   * @param cfiRange Selected CFIRange
   */
  const onRemoveHighlight = useCallback(
    (cfiRange: string) => {
      if (!rendition) return;

      rendition.annotations.remove(cfiRange, "highlight");
    },
    [rendition]
  );

  /**
   * Register viewer control function
   * @method
   * - REF.CURRENT.prevPage() : Move prev page
   * - REF.CURRENT.nextPage() : Move next page
   * - REF.CURRENT.getCurrentCfi() : Get current CFI
   * - REF.CURRENT.onHighlight(): Set highlight
   * - REF.CURRENT.offHighlight(): Remove specific highliht
   * - REF.CURRENT.seLocation(): Move to specific cfi or href
   */
  const registerGlobalFunc = useCallback(() => {
    if (!ref.current) return;
    if (movePage) {
      ref.current.prevPage = () => movePage("PREV");
      ref.current.nextPage = () => movePage("NEXT");
    }
    ref.current.getCurrentCfi = () => currentCfi.current;
    if (onHighlight) {
      ref.current.onHighlight = onHighlight;
    }
    if (onRemoveHighlight) {
      ref.current.offHighlight = onRemoveHighlight;
    }
    if (rendition) {
      ref.current.setLocation = (location: string) =>
        rendition.display(location);
    }
  }, [ref, rendition, movePage, onHighlight, onRemoveHighlight]);

  /** Ref Checker */
  useEffect(() => {
    if (!ref) {
      throw new Error(
        "[React-Epub-Viewer] Put a ref argument that has a ViewerRef type."
      );
    }
  }, [ref]);

  /** Epub init options Changed */
  useEffect(() => {
    if (!url) return;

    let mounted: boolean = true;
    let book_: Book | any = null;

    if (!mounted) return;

    if (book_) {
      book_.destroy();
    }

    book_ = new Book(url, epubFileOptions);
    setBook(book_);

    return () => {
      mounted = false;
    };
  }, [url, epubFileOptions, setBook, setIsLoaded]);

  /** Book Changed */
  useEffect(() => {
    if (!book) return;

    if (bookChanged) bookChanged(book);

    book.loaded.navigation.then(({ toc }) => {
      const toc_: Toc[] = toc.map((t) => ({
        label: t.label,
        href: t.href,
      }));
      debugger;
      setIsLoaded(true);
      if (tocChanged) tocChanged(toc_);
    });

    book.ready
      .then(function () {
        if (!book) return;
        debugger;

        const stored = localStorage.getItem(book.key() + "-locations");
        if (stored) {
          return book.locations.load(stored);
        } else {
          return book.locations.generate(1024);
        }
      })
      .then(() => {
        if (!book) return;
        localStorage.setItem(book.key() + "-locations", book.locations.save());
      });
  }, [book, bookChanged, tocChanged]);

  /** Rendition Changed */
  useEffect(() => {
    if (!rendition) return;

    if (rendtionChanged) rendtionChanged(rendition);
  }, [rendition, rendtionChanged]);

  const getOffset = (startCfi: any) => {
    const [_, spinePos, offset] = startCfi.split("!");
    const spineIndex = parseInt(spinePos);
    const offsetInt = parseInt(offset);
    const newSpineIndex = spineIndex + 2;
    const newOffset = offset + 1000; // some value to move ~1 page
    const adjustedCfi = `/${newSpineIndex}!${newOffset},/1:0,`;
    return adjustedCfi;
  };
  /** Viewer Option Changed */
  useEffect(() => {
    let mounted = true;
    if (!book) return;

    const node = ref.current;
    if (!node) return;
    node.innerHTML = "";

    book.ready.then(function () {
      if (!mounted) return;

      if (book.spine) {
        const loc = location
          ? location.startCfi
          : book.rendition?.location?.start?.cfi;

        // if (book.rendition) book.rendition.destroy();

        const rendition_ = book.renderTo(node, {
          width: "100%",
          height: "100%",
          ...epubOptions,
        });
        setRendition(rendition_);
        debugger;
        if (!isLoaded) {
          return () => {};
        }
        if (loc) {
          rendition_.display(loc);
        } else {
          rendition_.display();
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [ref, book, epubOptions, style, setRendition]);

  /** Location Changed */
  // useEffect(() => {
  //   if (!ref.current || !location) return;

  //   if (ref.current.setLocation) ref.current.setLocation(location);
  // }, [ref]);

  /**
   * Emit Viewer Event
   * - Register move event
   * - Register location changed event
   * - Register selection event
   */
  /* eslint-disable */
  useEffect(() => {
    if (!rendition) return;

    // Emit global control function
    registerGlobalFunc();

    document.addEventListener("keyup", handleKeyPress, false);
    rendition.on("keyup", handleKeyPress);
    rendition.on("locationChanged", onLocationChange);
    selectionChanged && rendition.on("selected", selectionChanged);

    return () => {
      document.removeEventListener("keyup", handleKeyPress, false);
      rendition.off("keyup", handleKeyPress);
      rendition.off("locationChanged", onLocationChange);
      selectionChanged && rendition.off("selected", selectionChanged);
    };
  }, [rendition, registerGlobalFunc, handleKeyPress]);
  /* eslint-enable */

  return (
    <>
      {!isLoaded && loadingView}
      <div ref={ref} style={viewerStyle} />
    </>
  );
};

export default React.forwardRef(EpubViewer);
