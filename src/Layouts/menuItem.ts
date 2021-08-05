import { MenuItemType } from '@paljs/ui/types';

import { storeLogin } from 'components/redux/storeLogin';
	
const items = () => {  
  var roleAss = Object.assign({},storeLogin.getState().authRoleAssign);
  
  let mrole = {}
  let cekmrole = Object.values(roleAss).find((obj) => {
    return obj === "mrole"
  });
  if(cekmrole)
    mrole =
      {
       title: 'Role',
       icon: { name: 'browser-outline' },
       children: [
       {
        title: 'List Role',
        link: { href: '/role/role_list' },
       }
      ],
      }
  
  let muser = {}
  let cekmuser = Object.values(roleAss).find((obj) => {
     return obj === "muser"
  });
  if(cekmuser)
       muser =
          {
           title: 'User',
           icon: { name: 'browser-outline' },
           children: [
           {
            title: 'List User',
            link: { href: '/user/user_list' },
           }
          ],
          }    
  let mcustomer = {}
  let cekmcustomer = Object.values(roleAss).find((obj) => {
             return obj === "mcustomer"
          });
   if(cekmcustomer)
       mcustomer ={
                   title: 'Customer',
                   icon: { name: 'browser-outline' },
                   children: [
                   {
                    title: 'List Customer',
                    link: { href: '/customer/customer_list' },
                   }
                  ],
                  }         

  let mbarang = {}
  let cekmbarang = Object.values(roleAss).find((obj) => {
    return obj === "mbarang"
  });
  if(cekmbarang)
     mbarang =
      {
       title: 'Barang',
       icon: { name: 'browser-outline' },
       children: [
       {
        title: 'List Barang',
        link: { href: '/barang/barang_list' },
       }
      ],
      }

  let torder = {}
  let cektorder = Object.values(roleAss).find((obj) => {
        return obj === "torder"
  });
  if(cektorder)
      torder =
          {
           title: 'Order',
           icon: { name: 'star-outline' },
           children: [
           {
            title: 'List Order',
            link: { href: '/order/order_list' },
           }
          ],
          }    

	
const itemsData: MenuItemType[] = [

  {
			title: 'Home Page',
			icon: { name: 'home' },
			link: { href: '/dashboard' },
  },
  {
    title: 'MASTER',
    group: true,
  },
  mrole
  ,
  muser
  ,
  mcustomer
  ,
  mbarang
  ,
  {
    title: 'TRANSAKSI',
    group: true,
  },
  {
    title: 'Order',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'List Order',
        link: { href: '/order/order_list' },
      }
    ],
  }
];

return itemsData;
}


export default items;
