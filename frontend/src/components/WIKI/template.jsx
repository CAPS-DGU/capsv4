import WikiContent from './WikiEngine.jsx';

const WikiPage = ({ data,notFoundFlag,history }) => {
    return (
        <div className="m-4 wiki-page">
            <WikiContent DocTitle={data.title} content={data.content} notFoundFlag={notFoundFlag} history={history} />
        </div>
    );
};

export default WikiPage;