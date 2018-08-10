import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { ImagePreviewComponent } from './ImagePreviewComponent.jsx';
import '../css/filepicker.css';

const style = {
  width: '300px',
  height: '150px',
};
export class GalleryDropzoneComponent extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(files) {
    this.setState({
      files,
    });
  }
  renderPreview() {
    const array = this.state.files;
    const onChange = this.props.input.onChange;

    return array.map(img => (
      <ImagePreviewComponent key={'preview'} img={img} onChange={onChange} />
    ));
  }

  render() {
    return (
      <div className="dropzone-content">
        <div>
          <Dropzone
            className="filepicker dropzone dz-clickable dz-started"
            accept="image/jpeg, image/png"
            multiple={false}
            style={style}
            onDropAccepted={this.onDrop}
          >
            <p>subir imagen</p>
            {this.renderPreview()}
          </Dropzone>
        </div>
      </div>
    );
  }
}
