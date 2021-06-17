import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log("error", error);
    // Display fallback UI
    this.setState({ hasError: true });
    // We should open a ZD ticket or simply send to logDNA etc?
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // maybe make them logout? or a logout/refresh button
      return (
        <div className="text-center">
          <br /><br />
          <h1>
            Sorry!!<br /><br />
            Something went wrong.<br /><br />
            <small>
              We have been notified of the issue.<br />
              Try going back to the previous page and refreshing.
            </small>
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}