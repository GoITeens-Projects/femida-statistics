import s from './Shadow.module.css';

const Shadow = ({
  leftFirst,
  widthFirst,
  rightSecond,
  bottomSecond,
  heightSecond,
  backgroundBoth,
  borderColorBoth,
}) => {
  return (
    <>
      <div
        className={s.firstTestBorder}
        style={{
          left: `${leftFirst}px`,
          width: `${widthFirst}px`,
          backgroundColor: backgroundBoth,
          borderLeft: `1px solid ${borderColorBoth}`,
          borderTop: `1px solid ${borderColorBoth}`,
        }}
      ></div>
      <div
        className={s.secondTestBorder}
        style={{
          right: `${rightSecond}px`,
          bottom: `${bottomSecond}px`,
          height: `${heightSecond}px`,
          backgroundColor: backgroundBoth,
          borderLeft: `1px solid ${borderColorBoth}`,
          borderBottom: `1px solid ${borderColorBoth}`,
          borderRight: `1px solid ${borderColorBoth}`,
        }}
      ></div>
    </>
  );
};

export default Shadow;
