import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';
import { CiFilter } from "react-icons/ci";
import { Containers, ContainerSchedule, TextServerMembers, TitleSererMembers, TotalContainer, TotalMembersContainer, TotalMembersContainer_2, TotalMembersContainer_3, TotalMembersText } from './ServerMembers.styled';
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
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6EABD4" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6EABD4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />

                            <Area type="monotone" dataKey="joined" stroke="#ACD0D6" fillOpacity={1} fill="url(#colorJoined)" name="Приєдналося" />
                            <Area type="monotone" dataKey="left" stroke="#82ca9d" fillOpacity={1} fill="url(#colorLeft)" name="Покинуло" />

                        </AreaChart>
                    </ContainerSchedule>
                </div>
            </section>
        </>
    );
};
