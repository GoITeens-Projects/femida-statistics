import { useSelector } from 'react-redux';
import DonutChart from 'react-donut-chart';
import { selectWindowWidth } from '../../redux/filter/selectors';
import MainTop from 'components/MainTop/MainTop';

// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#E58845',
  '#E05744',
  '#D63BA3',
  '#97CB43',
  '#683EE0',
  '#407293',
  '#479FDE',
  '#83A2A7',
  '#DEAB9A',
  '#FEC830',
];

  const TopSection = ({ toArr, title, isChannel }) => {
  const ww = useSelector(selectWindowWidth)
  
  const size = (ww * 0.85 - 120) / 2
  const chart = size - 20
  const topArr = toArr
  const chartData = topArr.map(user => {return {label: user.userName, value: user.messagesQuantity}})

  return (
    <MainTop topArr={topArr} title={title} isChannel={isChannel}>
      <DonutChart
        data={chartData}
        strokeColor="#fff"
        innerRadius={0.4}
        colors={COLORS}
        width={chart}
        height={chart}
      />
    </MainTop>
  );
};

export default TopSection;
