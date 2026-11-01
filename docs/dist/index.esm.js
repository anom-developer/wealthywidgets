// WealthyWidgets ESM entry point
import React from 'react';

export const Button = (props) => React.createElement('button', props, props.children);
export const Card = (props) => React.createElement('div', props, props.children);
export const FinanceWidget = (props) => React.createElement('div', { className: 'ww-finance' }, props.title || 'Market Watch');
export const WeatherWidget = (props) => React.createElement('div', { className: 'ww-weather' }, props.location || 'Weather');
export const ActivityWidget = (props) => React.createElement('div', { className: 'ww-activity' }, props.title || 'Activity');
export const CodeWidget = (props) => React.createElement('div', { className: 'ww-code-widget' }, props.code || '');
export const Input = (props) => React.createElement('input', props);
export const Modal = (props) => props.isOpen ? React.createElement('div', { className: 'ww-modal' }, props.children) : null;
export const Dropdown = (props) => React.createElement('div', { className: 'ww-dropdown' }, props.placeholder);
export const ProgressBar = (props) => React.createElement('div', { className: 'ww-progress' }, props.value + '%');
export const Tooltip = (props) => React.createElement('span', null, props.children);
export const Badge = (props) => React.createElement('span', { className: 'ww-badge' }, props.children);
export const ToastProvider = (props) => React.createElement('div', null, props.children);
export const useToast = () => ({ toast: () => {}, dismiss: () => {}, dismissAll: () => {} });
