export default [
    { path: '/', component: () => import('@/HomePage') },
    { path: '/FreeTimer', component: () => import('@/components/FreeTimer') },
    { path: '/GameOfLife', component: () => import('@/components/GameOfLife') },
    { path: '/Sudoku', component: () => import('@/components/Sudoku') },
    { path: '/AudioPlayer', component: () => import('@/components/AudioPlayer') },
    { path: '/MotionSimulator', component: () => import('@/components/MotionSimulator') },
    { path: '/LiquidSimulator', component: () => import('@/components/LiquidSimulator') },
]