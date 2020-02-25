import React, { Component } from 'react';

class ContextMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
            this.setState({
                visible: true,
                x: event.clientX,
                y: event.clientY
            })
        });

        document.addEventListener('click', event => {
            event.preventDefault();
            if (this.contextRef.current.id === 'react-contextmenu') {
                this.click(event.target.getAttribute('index'))
            }
            this.setState({
                visible: false,
                x: 0,
                y: 0
            })
        })

    }

    click(index) {
        if (this.props.items[index].callback)
            this.props.items[index].callback();
        else {
            console.log('callback not registerd')
        }
    }

    styles = {
        position: 'absolute',
        top: `${this.state.x}px`,
        left: `${this.state.y}px`
    }

    render() {
        return (
            <div>
                {
                    this.state.visible ?
                        <div className="react-contextmenu" id='test' style={this.styles} ref={this.contextRef}>
                            {
                                this.props.items.map((item, index) => {
                                    return <div key={index} className="react-contextmenu-item" index={index}>
                                        {
                                            item.label
                                        }
                                    </div>
                                })
                            }
                        </div> : null
                }
            </div>
        )
    }
}

export default ContextMenu;