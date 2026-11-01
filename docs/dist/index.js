// WealthyWidgets CommonJS entry point
const React = require('react');

module.exports = {
  Button: function(props) { return React.createElement('button', props, props.children); },
  Card: function(props) { return React.createElement('div', props, props.children); },
  FinanceWidget: function(props) { return React.createElement('div', { className: 'ww-finance' }, props.title || 'Market Watch'); },
  WeatherWidget: function(props) { return React.createElement('div', { className: 'ww-weather' }, props.location || 'Weather'); },
  ActivityWidget: function(props) { return React.createElement('div', { className: 'ww-activity' }, props.title || 'Activity'); },
  CodeWidget: function(props) { return React.createElement('div', { className: 'ww-code-widget' }, props.code || ''); },
  Input: function(props) { return React.createElement('input', props); },
  Modal: function(props) { return props.isOpen ? React.createElement('div', { className: 'ww-modal' }, props.children) : null; },
  Dropdown: function(props) { return React.createElement('div', { className: 'ww-dropdown' }, props.placeholder); },
  ProgressBar: function(props) { return React.createElement('div', { className: 'ww-progress' }, props.value + '%'); },
  Tooltip: function(props) { return React.createElement('span', null, props.children); },
  Badge: function(props) { return React.createElement('span', { className: 'ww-badge' }, props.children); },
  ToastProvider: function(props) { return React.createElement('div', null, props.children); },
  useToast: function() { return { toast: function() {}, dismiss: function() {}, dismissAll: function() {} }; }
};
