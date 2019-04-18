import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer col-md-12">
                <div className="dev-container">
                    <p>Developed by:</p>
                    <a className="dev-box" href="https://github.com/hugocica/" target="_blank" rel="noopener noreferrer" >
                        <i className="fa fa-github" aria-hidden="true"></i>
                        <span>Hugo Cicarelli</span>
                    </a>
                </div>
            </footer>
        );
    }
}

export default (Footer);
