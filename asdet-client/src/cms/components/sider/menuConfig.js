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
                title: '商品列表',
                url: '/manage/products/list',
                icon: ''
            },
            {
                title: '商品分类',
                url: '/manage/product/category',
                icon: ''
            }
        ]
    }
]

export default menuList