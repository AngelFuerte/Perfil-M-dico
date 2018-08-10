import React, { Component } from 'react';

export class ImagePreviewComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      success: false,
      error: false,
    };
  }

  componentDidMount() {
    const reader = new FileReader();
    const FileName = this.props.img.name;
    reader.readAsDataURL(this.props.img);
    reader.onload = () => {
      const data = {
        image_base_64: reader.result,
        name: FileName,
      };

      this.props.onChange(data);
    };
  }

  render() {
    return (
      <div className="imagePreview">
        <img key={this.props.img.preview} src={this.props.img.preview} alt="" />
      </div>
    );
  }
}
