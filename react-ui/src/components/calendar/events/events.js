export default [
    {
        id: 1,
        title: 'Tomorrow',
        start: new Date(new Date().setHours(new Date().getHours() + 24)),
        end: new Date(new Date().setHours(new Date().getHours() + 25)),
    },
    {
        id: 2,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours())),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
]