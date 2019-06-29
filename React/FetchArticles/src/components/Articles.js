import React from 'react';

function Articles({articleList, dismiss, logIt}) {
    //need to wrap dismiss with arrow function; onClick={this.dismiss} unable to do because need to pass in objectID
    //onClick={this.dismiss(item.objectID)} is auto execute and that manipulates state before render is done
    //causing program to complain; logIt is okay as it's just a console log
    return (
        <div className='table'>
            {articleList.map(item =>
                <div key={item.objectID} className='table-row'>
                    <span>
                        <a href={item.url}>{item.title} </a>
                    </span>   
                    <span>by {item.author} </span>
                    <span># of comments: {item.num_comments} </span>
                    <span>POINTS: {item.points} </span>
                    <span>ID: {item.objectID} </span>
                    <span>
                        <button onClick={() => dismiss(item.objectID)} type="button">
                            Dismiss
                        </button>
                    </span>
                    <span>
                        <button onClick={logIt} type="button">
                            Log It
                        </button>
                    </span>
                </div>
            )}
        </div>
    ); 
}

export default Articles;