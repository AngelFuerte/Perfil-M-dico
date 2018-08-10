import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { MedicalList } from '../SearchMedical/MedicalList.jsx';

const MedicalSearch = ({ searchBy }) => (
  <div className="Search">
    <input type="text" placeholder="Buscar Medico" onChange={searchBy} />
  </div>
);

class SearchMedical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedOption: 'fullName',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchBy = this.searchBy.bind(this);
  }

  searchBy(input) {
    this.setState({ inputValue: input.target.value });
  }

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    const { selectedOption } = this.state;
    const { dataMedical } = this.props;
    return (
      <div className="SearchMedical">
        <Input
          type="select"
          name="select"
          value={selectedOption}
          onChange={this.handleChange}
        >
          <option value="fullName">fullName</option>
          <option value="curp">curp</option>
        </Input>

        <MedicalSearch searchBy={this.searchBy} />
        <MedicalList
          dataMedical={dataMedical}
          inputValue={this.state.inputValue.toLowerCase()}
          type={selectedOption}
        />
      </div>
    );
  }
}

export { SearchMedical };
