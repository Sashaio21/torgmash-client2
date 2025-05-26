

const TabPanel = ({ value, index, children }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <div>{children}</div>}
        </div>
    );
};


export {TabPanel}