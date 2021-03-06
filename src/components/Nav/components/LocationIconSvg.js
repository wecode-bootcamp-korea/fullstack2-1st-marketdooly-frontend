import React, { Component } from 'react';

export default class LocationIconSvg extends Component {
  render() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 36 36'
      >
        <defs>
          <filter id='y19hl5xsfa'>
            <feColorMatrix
              in='SourceGraphic'
              values='0 0 0 0 0.200000 0 0 0 0 0.200000 0 0 0 0 0.200000 0 0 0 1.000000 0'
            />
          </filter>
        </defs>
        <g
          fill='none'
          fillRule='evenodd'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <g
            stroke={this.props.strokeColor}
            strokeWidth='2'
            transform='translate(8 6)'
          >
            <path d='M19.636 9.818C19.636 17.455 9.818 24 9.818 24S0 17.455 0 9.818C0 4.396 4.396 0 9.818 0c5.423 0 9.818 4.396 9.818 9.818h0z' />
            <circle cx='9.818' cy='9.818' r='3.273' />
          </g>
        </g>
      </svg>
    );
  }
}
