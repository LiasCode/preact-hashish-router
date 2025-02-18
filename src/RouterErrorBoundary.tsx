import { Component, VNode } from "preact";
import { PropsWithChildren } from "preact/compat";

export class RouterErrorBoundary extends Component<PropsWithChildren & { fallback?: VNode }> {
  state = { error: null };

  static getDerivedStateFromError(error: any) {
    return { error: error.message };
  }

  componentDidCatch(error: any) {
    console.error(error);
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return <p>Oh no! We ran into an error: {this.state.error}</p>;
    }
    return this.props.children;
  }
}
