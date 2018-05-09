import React, { Component } from 'react';

const Button = ({ color, style }) => (
  <a
    style={{
      position: 'absolute',
      left: -45,
      top: -20,
      padding: '8px 16px',
      fontWeight: 600,
      backgroundColor: 'white',
      border: `2px solid ${color}`,
      borderRadius: 3,
      color,
      fontFamily: 'BlinkMacSystemFont, -apple-system',
      ...style
    }}
  >
    Button
  </a>
);

const colorScales = {
  red: [
    '#430c15',
    '#711423',
    '#a01c32',
    '#bf223c',
    '#da304c',
    '#e35f75',
    '#ec93a2',
    '#f3bac3',
    '#f9dce1',
    '#fcf0f2'
  ].reverse(),
  orange: [
    '#341a04',
    '#5b2c06',
    '#813f09',
    '#a24f0b',
    '#b6590d',
    '#e06d10',
    '#f4a15d',
    '#f8c296',
    '#fbdbc1',
    '#fdf1e7'
  ].reverse(),
  gold: [
    '#2c1c02',
    '#573905',
    '#744c06',
    '#8e5c07',
    '#a26a09',
    '#c7820a',
    '#f4a929',
    '#f8cd81',
    '#fbe2b6',
    '#fdf3e2'
  ].reverse(),
  green: [
    '#0f2417',
    '#1c422b',
    '#285d3d',
    '#31724b',
    '#398557',
    '#46a46c',
    '#79c698',
    '#b0ddc2',
    '#d8eee1',
    '#eff8f3'
  ].reverse(),
  cyan: [
    '#0c2427',
    '#164249',
    '#1d5962',
    '#26727e',
    '#2b818e',
    '#35a0b1',
    '#66c3d1',
    '#a5dce4',
    '#d0edf1',
    '#e9f7f9'
  ].reverse(),
  blue: [
    '#0c2231',
    '#163d57',
    '#1f567a',
    '#276d9b',
    '#2c7cb0',
    '#479ad1',
    '#7cb7de',
    '#add2eb',
    '#d6e9f5',
    '#ebf4fa'
  ].reverse(),
  indigo: [
    '#181e34',
    '#2c365e',
    '#404e88',
    '#5062aa',
    '#6373b6',
    '#8794c7',
    '#a5aed5',
    '#c8cde5',
    '#e0e3f0',
    '#f1f3f8'
  ].reverse(),
  violet: [
    '#2d1832',
    '#502b5a',
    '#753f83',
    '#8e4c9e',
    '#9f5bb0',
    '#b683c3',
    '#c9a2d2',
    '#dbc1e1',
    '#ebddee',
    '#f7f1f8'
  ].reverse(),
  gray: [
    '#1d1f20',
    '#36393a',
    '#4e5255',
    '#62676a',
    '#72777b',
    '#92979b',
    '#b7bbbd',
    '#d5d7d8',
    '#eaebeb',
    '#f7f7f8'
  ].reverse()
};

const fontWeights = [200, 400, 600, 800];
const borderWidths = [1, 3, 5, 7, 9];

class ThreeStacks extends Component {
  state = {
    mouseX: 0.5,
    mouseY: 0.5
  };

  handleMouseMove = e => {
    const x = e.clientX / this.ref.clientWidth;
    const y = e.clientY / this.ref.clientHeight;

    this.setState({ mouseX: x, mouseY: y });
  };

  render() {
    const { mouseX, mouseY } = this.state;
    const { x, y, z } = this.props;

    return (
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: x.values
            .map((_, index) => 1 / x.values.length * 100 + '%')
            .join(' '),
          gridTemplateRows: y.values
            .map((_, index) => 1 / y.values.length * 100 + '%')
            .join(' '),
          placeItems: 'center',
          placeContent: 'stretch',
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          perspectiveOrigin: `${mouseX * 100}% ${mouseY * 100}%`
        }}
        onMouseMove={this.handleMouseMove}
        ref={ref => (this.ref = ref)}
      >
        {y.values.map((_, yi) =>
          x.values.map((_, xi) => (
            <div style={{position: 'relative'}}>
              {z.values.map((_, zi) => {
                return (
                  <Button
                    color={z.values[zi]}
                    style={{
                      transform: `translateZ(${zi * 40}px)`,
                      [x.property]: x.values[xi],
                      [y.property]: y.values[yi]
                    }}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>
    );
  }
}

const App = () => (
  <ThreeStacks
    x={{ property: 'fontWeight', values: fontWeights }}
    y={{ property: 'borderWidth', values: borderWidths }}
    z={{ property: 'color', values: colorScales['blue'] }}
  />
);

export default App;
