/**
 * ClickOutside React Component
 * Ripped from https://github.com/tj/react-click-outside/blob/master/index.js
 *
 * @author    Nick Dreckshage <ndreckshage@wayfair.com>
 * @copyright 2017 Wayfair LLC - All rights reserved
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { validDOMNodeOrUndefined } from 'custom_prop_types';

export default class ClickOutside extends Component {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    children: PropTypes.node,
    triggerElement: PropTypes.node,
  };

  static defaultProps = {
    children: null,
    triggerElement: null,
  };

  componentDidMount() {
    document.addEventListener('touchstart', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  // Used for storing the event.type used first.
  eventType = null;

  handle = e => {
    const el = this.container;
    // If eventType not set, set the first one given.
    if (!this.eventType) {
      this.eventType = e.type;
    }

    // Only use the first given event type.
    // Check if user does not click within the popover or the target (if one is given)
    // then call onClickOutside.
    const clickTargetNotInContainer = !el.contains(e.target);
    const clickTargetNotInTargetProp =
      !this.props.triggerElement ||
      !this.props.triggerElement.contains(e.target);
    if (
      this.eventType === e.type &&
      clickTargetNotInContainer &&
      clickTargetNotInTargetProp
    ) {
      this.props.onClickOutside(e);
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, onClickOutside, triggerElement, ...props } = this.props;
    return (
      <div {...props} ref={ref => (this.container = ref)}>
        {children}
      </div>
    );
  }
}
