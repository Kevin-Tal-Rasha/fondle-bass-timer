export default [
    { path: '/', component: () => import('@/components/Timer/MainTimer') },
    { path: '/gol', component: () => import('@/components/GameOfLife') },
]