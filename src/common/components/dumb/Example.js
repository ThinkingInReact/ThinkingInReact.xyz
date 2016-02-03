import React, { Component } from 'react';
import Markdown from 'react-remarkable';

const imagePaths = {
  weatherTodos: require('images//examples/weatherTodos.jpg'),
  site: require('images//examples/site.gif'),
  imgdiscuss: require('images//examples/imgdiscuss.jpg'),
  more: require('images//examples/more.jpg')
};

class Example extends Component {
  render() {
    const imgSrc = imagePaths[this.props.image];
    return (
      <div className="Example">
        <div className="Example__Inner">
          <div className="Example__Img_Container">
            <img src={imgSrc} alt="example" className="Example__Img" />
          </div>
          <div className="Example__Desc">
            <h2 className="Example_Title">{this.props.title}</h2>
            <div className="Example__Desc__Text">
              <Markdown source={this.props.desc} />
            </div>
            <div className="Example__Links">
              {this.props.github && <a href={this.props.github} className="Example__Links__GitHub">Checkout the Source</a>}
              {this.props.demoLink && <a href={this.props.demoLink} className="Example__Links__Demo" title="demo link coming soon">View the demo</a>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
