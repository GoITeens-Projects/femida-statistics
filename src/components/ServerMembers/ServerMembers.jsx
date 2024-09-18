import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';
import { CiFilter } from "react-icons/ci";
import { ContainerBorderSchedule, ContainerBorderSchedule_2, Containers, ContainerSchedule, TextServerMembers, TitleSererMembers, TotalContainer, TotalMembersContainer, TotalMembersContainer_2, TotalMembersContainer_3, TotalMembersText } from './ServerMembers.styled';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { data } from './DataServerMmbers';

export const ServerMembers = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics); // Замініть на правильний шлях до вашого стейту

    return (
        <>
            <section>
                <div>
                    <TitleSererMembers>Учасники</TitleSererMembers>
                    <TextServerMembers>Загальна кількість учасників на сервері</TextServerMembers>


                    <ContainerBorderSchedule>
                        <Containers>
                            <TotalMembersContainer>
                                <TotalMembersText>Кількість учасників</TotalMembersText>
                                <TotalMembersText>3444</TotalMembersText>
                            </TotalMembersContainer>
                            <TotalMembersContainer_2>
                                <TotalMembersText>Приєдналось</TotalMembersText>
                                <TotalMembersText>320</TotalMembersText>
                            </TotalMembersContainer_2>
                            <TotalMembersContainer_3>
                                <p>Покинуло</p>
                                <p>198</p>
                            </TotalMembersContainer_3>
                        </Containers>

                        <ContainerSchedule>
                            <AreaChart width={1460} height={310} data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorJoined" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ACD0D6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ACD0D6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFE7DF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FFE7DF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4682B4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, stroke: "#678F95" }}  // Колір підписів
                                    axisLine={{ stroke: "#D2F1F6", strokeWidth: 2 }}
                                    tickLine={{ stroke: "#D2F1F6" }}// Колір і товщина лінії осі
                                />

                                <YAxis
                                    axisLine={false}
                                    tick={{ stroke: "#678F95", dx: -3 }}  // Зсув на 3px вліво
                                    tickLine={false}  // Прибираємо тире після цифр
                                />

                                <CartesianGrid
                                    stroke="#D2F1F6"
                                    strokeWidth={2}

                                    vertical={false}  // Вимикаємо горизонтальні лінії
                                />
                                <Tooltip />

                                <Area type="monotone" dataKey="joined" stroke="#ACD0D6" fillOpacity={1} fill="url(#colorJoined)" name="Приєдналося" />
                                <Area type="monotone" dataKey="left" stroke="#FFE7DF" fillOpacity={1} fill="url(#colorLeft)" name="Покинуло" />
                            </AreaChart>

                        </ContainerSchedule>
                    </ContainerBorderSchedule>



                </div>
            </section>
        </>
    );
};
