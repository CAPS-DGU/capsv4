import WikiContent from './WikiEngine.jsx';

const WikiPage = ({ data }) => {

    return (
        <div className="m-4 wiki-page">
            <WikiContent DocTitle={data.title} content={data.content} />
        </div>
    );
};

export default WikiPage;