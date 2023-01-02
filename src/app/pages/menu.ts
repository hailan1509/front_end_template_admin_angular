export default function (values: any) {
  return [
    {
      title: values['dashboard']['title'],
      link: '/pages/dashboard/analysis',
      menuIcon: 'icon icon-console',
    },
    {
      title: "Quản lý khu vực",
      link: '/pages/quan-ly/area',
      menuIcon: 'icon icon-console',
    },
    {
      title: values['PH1']['title'],
      children: [
        {
          title: values['PH1']['qlhsccl'],
          link: '/pages/PH1/qlhsccl',
        },
        {
          title: values['PH1']['bshs'],
          link: '/pages/PH1/bshs',
        },
        {
          title: values['PH1']['qlhsdcl'],
          link: '/pages/PH1/qlhsdcl',
        },
        {
          title: values['PH1']['tchs'],
          link: '/pages/PH1/tchs',
        },
        {
          title: values['PH1']['tctl'],
          link: '/pages/PH1/tctl',
        },
        {
          title: values['PH1']['ihstf'],
          link: '/pages/PH1/ihstf',
        },
        {
          title: values['PH1']['itltf'],
          link: '/pages/PH1/itltf',
        },
      ],
      link: '/pages/PH1',
      menuIcon: 'icon icon-modify',
    },
    {
      title: values['PH2']['title'],
      children: [
        { title: values['PH2']['lbbbg'], link: '/pages/PH2/lbbbg' },
        { title: values['PH2']['bbbgcd'], link: '/pages/PH2/bbbgcd' },
        { title: values['PH2']['qlbbbg'], link: '/pages/PH2/qlbbbg' },
      ],
      link: '/pages/PH2',
      menuIcon: 'icon icon-table',
    },
    {
      title: values['PH3']['title'],
      children: [
        {
          title: values['PH3']['qlhsch'],
          link: '/pages/PH3/qlhsch',
        },
        {
          title: values['PH3']['lbbbghtl'],
          link: '/pages/PH3/lbbbghtl',
        },
        {
          title: values['PH3']['qlbbbghtl'],
          link: '/pages/PH3/qlbbbghtl',
        },
        {
          title: values['PH3']['lbbthtl'],
          link: '/pages/PH3/lbbthtl',
        },
        {
          title: values['PH3']['bbthtlcd'],
          link: '/pages/PH3/bbthtlcd',
        },
        {
          title: values['PH3']['qlbbthtl'],
          link: '/pages/PH3/qlbbthtl',
        },
        {
          title: values['PH3']['qlhsdh'],
          link: '/pages/PH3/qlhsdh',
        },
      ],
      link: '/pages/PH3',
      menuIcon: 'icon icon-modify',
    },
    {
      title: values['PH4']['title'],
      children: [
        {
          title: values['PH4']['lpkths'],
          link: '/pages/PH4/lpkths',
        },
        {
          title: values['PH4']['qlpkths'],
          link: '/pages/PH4/qlpkths',
        },
        {
          title: values['PH4']['dpkths'],
          link: '/pages/PH4/dpkths',
        },
        {
          title: values['PH4']['qlsmhs'],
          link: '/pages/PH4/qlsmhs',
        },
        {
          title: values['PH4']['qltlmqh'],
          link: '/pages/PH4/qltlmqh',
        },
        {
          title: values['PH4']['tkslnkttl'],
          link: '/pages/PH4/tkslnkttl',
        },
        {
          title: values['PH4']['tkslnkths'],
          link: '/pages/PH4/tkslnkths',
        },
        {
          title: values['PH4']['bctklspd'],
          link: '/pages/PH4/bctklspd',
        },
      ],
      link: '/pages/PH4',
      menuIcon: 'icon icon-modify',
    },
    {
      title: values['PH5']['title'],
      children: [
        {
          title: values['PH5']['bcdlskdn'],
          link: '/pages/PH5/bcdlskdn',
        },
        {
          title: values['PH5']['bchslt'],
          link: '/pages/PH5/bchslt',
        },
        {
          title: values['PH5']['bchsh'],
          link: '/pages/PH5/bchsh',
        },
        {
          title: values['PH5']['bcpkt'],
          link: '/pages/PH5/bcpkt',
        },
        {
          title: values['PH5']['bchstldm'],
          link: '/pages/PH5/bchstldm',
        },
        {
          title: values['PH5']['tkhsdvlt'],
          link: '/pages/PH5/tkhsdvlt',
        },
        {
          title: values['PH5']['tkslhstn'],
          link: '/pages/PH5/tkslhstn',
        },
        {
          title: values['PH5']['tksltltn'],
          link: '/pages/PH5/tksltltn',
        },
        {
          title: values['PH5']['tkbctvsh'],
          link: '/pages/PH5/tkbctvsh',
        },
        {
          title: values['PH5']['bcdmvbctlhs'],
          link: '/pages/PH5/bcdmvbctlhs',
        }
      ],
      link: '/pages/PH5',
      menuIcon: 'icon icon-table',
    },
  ];
}
