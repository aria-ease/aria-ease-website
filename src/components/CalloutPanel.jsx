// eslint-disable-next-line react/prop-types
const CalloutPanel = ({ title, tone = 'neutral', className = '', titleAs = 'p', children }) => {
  const TitleTag = titleAs;
  const combinedClassName = ['tone-card-emphasis callout-panel', `callout-${tone}`, className].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {title ? <TitleTag className='callout-title black-white-text'>{title}</TitleTag> : null}
      <div className='callout-content black-grey-text'>{children}</div>
    </div>
  );
};

export default CalloutPanel;
