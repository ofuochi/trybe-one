import React from "react";
import Helmet from "react-helmet";

export const Title = ({ title }: { title: string }) => {
  const defaultTitle = "TrybeOne";
  return (
    <Helmet defaultTitle={defaultTitle}>
      <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
    </Helmet>
  );
};
