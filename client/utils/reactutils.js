const React = require('react');

export const mapPropsToChildren = (children, childProps) => {
  if (!children || !children.length || !childProps || (typeof childProps !== 'object')) return children;
  return children.map(child => {
    return child.map(item => {
      return React.cloneElement(item, Object.assign({}, childProps));
    });
  });
};
