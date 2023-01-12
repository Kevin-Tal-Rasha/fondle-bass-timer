export default [
    { path: '/', component: () => import('@/HomePage') },
    { path: '/freetimer', component: () => import('@/components/FreeTimer') },
    { path: '/gol', component: () => import('@/components/GameOfLife') },
    { path: '/sudoku', component: () => import('@/components/Sudoku') },
    { path: '/audioplayer', component: () => import('@/components/AudioPlayer') },
]