import React, { Component } from 'react';

export default class CartIconSvg extends Component {
  render() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 36 36'
      >
        <g fill='none' fillRule='evenodd'>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d='M0 0H36V36H0z'
                      transform='translate(-1314 -398) translate(100 246) translate(0 142) translate(1214 10) matrix(-1 0 0 1 36 0)'
                    />
                    <path
                      stroke={this.props.strokeColor}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M31.393 5.55L27.634 5.55 24.205 21.214 9.595 21.214 6.533 9.625 26.364 9.625'
                      transform='translate(-1314 -398) translate(100 246) translate(0 142) translate(1214 10) matrix(-1 0 0 1 36 0)'
                    />
                    <path
                      stroke={this.props.strokeColor}
                      strokeWidth='2'
                      d='M11.2 28.887c-1.104 0-2-.895-2-2 0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2zM24.5 26.887c0 1.105-.896 2-2 2s-2-.895-2-2c0-1.104.896-2 2-2s2 .896 2 2'
                      transform='translate(-1314 -398) translate(100 246) translate(0 142) translate(1214 10) matrix(-1 0 0 1 36 0)'
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
