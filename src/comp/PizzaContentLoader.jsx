import React from 'react';
import ContentLoader from "react-content-loader";

const PizzaContentLoader = () => {
    return (
            <ContentLoader
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            >
            <circle cx="132" cy="120" r="120" />
            <rect x="0" y="274" rx="3" ry="3" width="280" height="26" />
            <rect x="0" y="404" rx="3" ry="3" width="103" height="48" />
            <rect x="0" y="314" rx="0" ry="0" width="282" height="78" />
            <rect x="125" y="399" rx="23" ry="23" width="150" height="56" />
        </ContentLoader>
    );
};

export default PizzaContentLoader;