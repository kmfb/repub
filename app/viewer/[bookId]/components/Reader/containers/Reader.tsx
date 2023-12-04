import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { ReactEpubViewer } from "react-epub-viewer";
// containers
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Nav from "../containers/menu/Nav";
import Option from "../containers/menu/Option";
import Learning from "../containers/menu/Note";
import ContextMenu from "../containers/commons/ContextMenu";
import Snackbar from "../containers/commons/Snackbar";
// components
import ViewerWrapper from "../components/commons/ViewerWrapper";

// slices
import store from "../slices";
import { updateBook, updateCurrentPage, updateToc } from "../slices/book";
// hooks
import useMenu from "../lib/hooks/useMenu";
import useHighlight from "../lib/hooks/useHighlight";
// styles
import "../lib/styles/readerStyle.css";
import viewerLayout from "../lib/styles/viewerLayout";
// types
import { RootState } from "../slices";
import { ViewerRef } from "../types";
import Book, { BookStyle, BookOption } from "../types/book";
import Page from "../types/pageType";
import Toc from "../types/toc";
import LoadingView from "../LoadingView";
import { IBook } from "@/app/interface";
import _ from "lodash";

const Reader = ({ book: serverBook, loadingView }: Props) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, Page>(
    (state) => state.book.currentLocation
  );

  const viewerRef = useRef<ViewerRef | any>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);
  const learningRef = useRef<HTMLDivElement | null>(null);

  const [isContextMenu, setIsContextMenu] = useState<boolean>(false);

  const [bookStyle, setBookStyle] = useState<BookStyle>({
    fontFamily: "Origin",
    fontSize: 18,
    lineHeight: 1.4,
    marginHorizontal: 15,
    marginVertical: 5,
  });

  const [bookOption, setBookOption] = useState<BookOption>({
    flow: "paginated",
    resizeOnOrientationChange: true,
    spread: "auto",
  });

  const [navControl, onNavToggle] = useMenu(navRef, 300);
  const [optionControl, onOptionToggle, emitEvent] = useMenu(optionRef, 300);
  const [learningControl, onLearningToggle] = useMenu(learningRef, 300);
  const {
    selection,
    onSelection,
    onClickHighlight,
    onAddHighlight,
    onRemoveHighlight,
    onUpdateHighlight,
  } = useHighlight(viewerRef, setIsContextMenu, bookStyle, bookOption.flow);

  /**
   * Change Epub book information
   * @param book Epub Book Info
   */
  const onBookInfoChange = (book: Book) => dispatch(updateBook(book));

  /**
   * Change Epub location
   * @param loc epubCFI or href
   */
  const onLocationChange = (loc: string) => {
    if (!viewerRef.current) return;
    viewerRef.current.setLocation(loc);
  };

  /**
   * Move page
   * @param type Direction
   */
  const onPageMove = (type: "PREV" | "NEXT") => {
    const node = viewerRef.current;
    if (!node || !node.prevPage || !node.nextPage) return;

    type === "PREV" && node.prevPage();
    type === "NEXT" && node.nextPage();
  };

  /**
   * Set toc
   * @param toc Table of Epub contents
   */
  const onTocChange = (toc: Toc[]) => dispatch(updateToc(toc));

  /**
   * Set Epub viewer styles
   * @param bokkStyle_ viewer style
   */
  const onBookStyleChange = (bookStyle_: BookStyle) => setBookStyle(bookStyle_);

  /**
   * Set Epub viewer options
   * @param bookOption_ viewer option
   */
  const onBookOptionChange = (bookOption_: BookOption) =>
    setBookOption(bookOption_);

  /**
   * Change current page
   * @param page Epub page
   */
  const onPageChange = (page: Page) => {
    return dispatch(updateCurrentPage(page));
  };

  /**
   * ContextMenu on
   * @param cfiRange CfiRange
   */
  const onContextMenu = (cfiRange: string) => {
    const result = onSelection(cfiRange);
    setIsContextMenu(result);
  };

  /** ContextMenu off */
  const onContextmMenuRemove = () => setIsContextMenu(false);

  useEffect(() => {
    const syncPage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (!viewerRef.current) {
        return () => {};
      }
      console.log("serverBook.location", serverBook.location);
      viewerRef.current?.setLocation &&
        viewerRef.current?.setLocation(serverBook.location);
    };
    syncPage();

    console.log("viewerRef.current", viewerRef.current?.setLocation);
  }, []);
  console.log(currentLocation, "im currentLocation");

  return (
    <>
      <ViewerWrapper>
        <Header
          onNavToggle={onNavToggle}
          onOptionToggle={onOptionToggle}
          onLearningToggle={onLearningToggle}
        />

        <ReactEpubViewer
          url={serverBook?.content as any}
          viewerLayout={viewerLayout}
          viewerStyle={bookStyle}
          viewerOption={bookOption}
          onBookInfoChange={onBookInfoChange}
          onPageChange={onPageChange}
          onTocChange={onTocChange}
          onSelection={onContextMenu}
          loadingView={loadingView || <LoadingView />}
          ref={viewerRef}
        />

        <Footer
          title={currentLocation.chapterName}
          nowPage={currentLocation.currentPage}
          totalPage={currentLocation.totalPage}
          onPageMove={onPageMove}
        />
      </ViewerWrapper>

      <Nav
        control={navControl}
        onToggle={onNavToggle}
        onLocation={onLocationChange}
        ref={navRef}
      />

      <Option
        control={optionControl}
        bookStyle={bookStyle}
        bookOption={bookOption}
        bookFlow={bookOption.flow}
        onToggle={onOptionToggle}
        emitEvent={emitEvent}
        onBookStyleChange={onBookStyleChange}
        onBookOptionChange={onBookOptionChange}
        ref={optionRef}
      />

      <Learning
        control={learningControl}
        onToggle={onLearningToggle}
        onClickHighlight={onClickHighlight}
        emitEvent={emitEvent}
        viewerRef={viewerRef}
        ref={learningRef}
      />

      <ContextMenu
        active={isContextMenu}
        viewerRef={viewerRef}
        selection={selection}
        onAddHighlight={onAddHighlight}
        onRemoveHighlight={onRemoveHighlight}
        onUpdateHighlight={onUpdateHighlight}
        onContextmMenuRemove={onContextmMenuRemove}
      />

      <Snackbar />
    </>
  );
};

const ReaderWrapper = ({ book, loadingView }: Props) => {
  return (
    <Provider store={store}>
      <Reader book={book} loadingView={loadingView} />
    </Provider>
  );
};

interface Props {
  book: IBook;
  loadingView?: React.ReactNode;
}

export default ReaderWrapper;
