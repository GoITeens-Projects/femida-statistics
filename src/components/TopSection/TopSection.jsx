import { useSelector } from 'react-redux';
import styles from './TopSection.module.css';
import DonutChart from 'react-donut-chart';
import { selectWindowWidth } from '../../redux/filter/selectors';
import { TopsGlobalBox } from './TopSection.styled';
import { useEffect } from 'react';
import MainTop from 'components/MainTop/MainTop';

// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
const data = [
  { label: 'Назва чогось', value: 350 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 200 },
  { label: 'Group D', value: 150 },
  { label: 'Group E', value: 400 },
  { label: 'Group F', value: 300 },
  { label: 'Group G', value: 300 },
  { label: 'Group L', value: 200 },
  { label: 'Group X', value: 400 },
  { label: 'Group I', value: 300 },
];
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
  const topArr = toArr.slice((toArr.length) /2)
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
