import "./HtmlDisplay.scss";
const HTMLDisplay = ({ htmlContent }: { htmlContent: string }): JSX.Element => {
  return <div className='html-display' dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HTMLDisplay;
