import React, { Component } from 'react';
import { connect } from 'react-redux';
import Package from 'components//reduxed/Package';
import packages from 'content//Packages';

class Packages extends Component {
  static defaultProps =  { packages }

  render() {
    let packages = [];
    this.props.packages.map((packge, id) => {
      if(this.props.buyFormOpen) {
        if(this.props.packge.id == id) {
          packages.push(<Package id={id} {...packge} key={id} />);
        }
      }
      else {
        packages.push(<Package id={id} {...packge} key={id} />);
      }
    });

    return (
      <section className="Packages">
        <div className="Packages__Rows">
          {packages}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    packge: packages.find((element) => element.id == state.buyForm.packageId),
    buyFormOpen: state.buyForm.open
  }
}

export default connect(mapStateToProps)(Packages);
