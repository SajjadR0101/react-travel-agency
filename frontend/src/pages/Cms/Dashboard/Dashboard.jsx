import React from "react";
import DashboardInfoItem from "../components/DashboardInfoItem";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Chart from "react-apexcharts";
import { radialBarOptions, radialBarOrangeOptions, radialBarGrayOptions, radialBarGreenOptions, usersOrdersData, LatestOrdersData } from "../chartData";
import ShowInfoBox from "../components/ShowInfoBox";

export default function Dashboard() {
    return (
        <PageTransition>
            <div className="grid grid-cols-9 gap-8">
                <div className=" col-span-6">
                    <div className="grid grid-cols-4 gap-4">
                        <DashboardInfoItem title="Users" number={1234} to="users" />
                        <DashboardInfoItem title="Flights" number={54} to="flight-all" bgColorClass="bg-orange-400" />
                        <DashboardInfoItem title="Hotels" number={120} to="hotel-all" bgColorClass="bg-slate-600" />
                        <DashboardInfoItem title="NewsLatter" number={387} to="newslatter" bgColorClass="bg-teal-600" />
                    </div>
                    <ShowInfoBox title="Website Performance" className="mt-8">
                        <div className="flex flex-col p-6">
                            <Chart {...usersOrdersData} type="radar" />
                        </div>
                    </ShowInfoBox>
                    <ShowInfoBox title="Latest Orders" className="mt-8">
                        <div className="flex flex-col p-6">
                            <Chart {...LatestOrdersData} type="bar" />
                        </div>
                    </ShowInfoBox>
                </div>
                <div className="col-span-3">
                    <ShowInfoBox title="Integrations">
                        <div className="flex flex-col p-6">
                            <Chart series={[62.42]} type="radialBar" options={radialBarOptions} />
                            <Chart series={[42.87]} type="radialBar" options={radialBarOrangeOptions} />
                            <Chart series={[87.19]} type="radialBar" options={radialBarGrayOptions} />
                            <Chart series={[29.5]} type="radialBar" options={radialBarGreenOptions} />
                        </div>
                    </ShowInfoBox>
                </div>
            </div>
        </PageTransition>
    );
}
