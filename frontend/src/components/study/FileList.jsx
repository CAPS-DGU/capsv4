import React from 'react';

const FileList = ({ files }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700">첨부 파일</h2>
            <ul className="mt-2 text-gray-700">
                {files.map((file) => (
                    <li key={file.fileId}><a href={`#`} className="text-blue-500">{file.name}</a></li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
