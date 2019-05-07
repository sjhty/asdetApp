const menuList = [
    {
        title: '首页',
        url: '/manage/home',
        icon: 'home'
    },
    {
        title: '用户管理',
        url: '/manage/users',
        icon: 'user',
        children: [
            {
                title: '用户列表',
                url: '/manage/users/list',
                icon: ''
            }
        ]
    },
    {
        title: '商品管理',
        url: '/manage/products',
        icon: 'barcode',
        children: [
            {
                title: '添加商品',
                url: '/manage/products/add',
                icon: ''
            },
            {
                title: '商品列表',
                url: '/manage/products/list',
                icon: ''
            },
            {
                title: '商品分类',
                url: '/manage/products/category',
                icon: ''
            },
            {
                title: '借还商品',
                url: '/manage/products/borrow'
            }
        ]
    },
    {
        title: '订单管理',
        url: '/manage/orders',
        icon: 'appstore',
        children: [
            {
                title: '订单列表',
                url: '/manage/orders/list'
            },
            {
                title: '后台下单',
                url: '/manage/orders/cart'
            }
        ]
    },
    {
        title: '报表管理',
        url: '/manage/tables',
        icon: 'table',
        children: [
            {
                title: '商品库存总金额报表',
                url: '/manage/tables/product'
            },
            {
                title: '订单总金额报表',
                url: '/manage/tables/order'
            }
        ]
    }
]

export default menuList