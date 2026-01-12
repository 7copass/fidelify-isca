import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

// Cores Fidelify
const colors = {
    azulMarinho: '#1E293B',
    dourado: '#F59E0B',
    cinzaMedio: '#6B7280',
    vermelho: '#EF4444',
    verde: '#10B981',
}

interface ChartWrapperProps {
    children: React.ReactNode
    title?: string
}

function ChartWrapper({ children, title }: ChartWrapperProps) {
    return (
        <div className="chart-container">
            {title && <h4 className="chart-title">{title}</h4>}
            {children}
        </div>
    )
}

// Gráfico de Perda de Faturamento (Capítulo 2)
export function RevenueLossChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 6,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `R$ ${(val / 1000).toFixed(0)}k`,
            style: {
                fontSize: '11px',
                fontWeight: 600,
            },
        },
        colors: [colors.vermelho],
        xaxis: {
            categories: ['R$ 10k', 'R$ 20k', 'R$ 50k', 'R$ 100k'],
            labels: {
                style: { colors: colors.cinzaMedio, fontSize: '12px' },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (val: number) => `R$ ${(val / 1000).toFixed(0)}k`,
                style: { colors: colors.cinzaMedio },
            },
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
            },
        },
    }

    const series = [
        {
            name: 'Perda Mensal',
            data: [3000, 6000, 15000, 30000],
        },
    ]

    if (!mounted) return null

    return (
        <ChartWrapper title="Quanto você perde por mês sem recompra">
            <Chart options={options} series={series} type="bar" height={280} />
        </ChartWrapper>
    )
}

// Gráfico de Ciclo de Recompra (Capítulo 4)
export function RepurchaseCycleChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            toolbar: { show: false },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    size: '65%',
                },
                track: {
                    background: '#E5E7EB',
                    strokeWidth: '100%',
                },
                dataLabels: {
                    name: {
                        fontSize: '14px',
                        color: colors.cinzaMedio,
                        offsetY: 60,
                    },
                    value: {
                        fontSize: '32px',
                        fontWeight: 700,
                        color: colors.azulMarinho,
                        offsetY: -10,
                        formatter: (val: number) => `${val}%`,
                    },
                },
            },
        },
        colors: [colors.dourado],
        labels: ['Taxa de Retorno'],
    }

    const series = [40]

    if (!mounted) return null

    return (
        <ChartWrapper title="Aumento médio na taxa de retorno">
            <Chart options={options} series={series} type="radialBar" height={300} />
        </ChartWrapper>
    )
}

// Gráfico Comparativo Com/Sem Sistema (Capítulo 5)
export function ComparisonChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 6,
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: [colors.vermelho, colors.verde],
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            labels: {
                style: { colors: colors.cinzaMedio, fontSize: '12px' },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (val: number) => `R$ ${(val / 1000).toFixed(0)}k`,
                style: { colors: colors.cinzaMedio },
            },
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '13px',
            fontWeight: 500,
            markers: {
                size: 8,
                offsetX: -4,
            },
        },
        tooltip: {
            y: {
                formatter: (val: number) => `R$ ${val.toLocaleString('pt-BR')}`,
            },
        },
    }

    const series = [
        {
            name: 'Sem Sistema',
            data: [20000, 22000, 19000, 21000, 20500, 22500],
        },
        {
            name: 'Com Fidelify',
            data: [20000, 24000, 26000, 29000, 32000, 35000],
        },
    ]

    if (!mounted) return null

    return (
        <ChartWrapper title="Evolução do faturamento em 6 meses">
            <Chart options={options} series={series} type="bar" height={300} />
        </ChartWrapper>
    )
}

// Gráfico de Donut - Origem do Faturamento (Capítulo 3)
export function RevenueSourceChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels: ['Clientes Novos', 'Clientes Recorrentes'],
        colors: [colors.cinzaMedio, colors.dourado],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            fontSize: '14px',
                        },
                        value: {
                            fontSize: '24px',
                            fontWeight: 700,
                            color: colors.azulMarinho,
                        },
                        total: {
                            show: true,
                            label: 'Recorrentes',
                            fontSize: '12px',
                            color: colors.cinzaMedio,
                            formatter: () => '65%',
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: 'bottom',
            fontSize: '13px',
            fontWeight: 500,
            markers: {
                size: 10,
                offsetX: -4,
            },
        },
        stroke: {
            width: 0,
        },
    }

    const series = [35, 65]

    if (!mounted) return null

    return (
        <ChartWrapper title="De onde vem o faturamento das grandes redes">
            <Chart options={options} series={series} type="donut" height={280} />
        </ChartWrapper>
    )
}

// Gráfico de Linha - Projeção de Crescimento (Capítulo 7)
export function GrowthProjectionChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const options: ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: [colors.dourado],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 100],
            },
        },
        xaxis: {
            categories: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
            labels: {
                style: { colors: colors.cinzaMedio, fontSize: '12px' },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (val: number) => `+${val}%`,
                style: { colors: colors.cinzaMedio },
            },
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
        },
        markers: {
            size: 5,
            colors: [colors.dourado],
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `+${val}% de aumento`,
            },
        },
    }

    const series = [
        {
            name: 'Crescimento',
            data: [5, 12, 20, 28, 35, 40],
        },
    ]

    if (!mounted) return null

    return (
        <ChartWrapper title="Projeção de crescimento com máquina de recompra">
            <Chart options={options} series={series} type="area" height={280} />
        </ChartWrapper>
    )
}
