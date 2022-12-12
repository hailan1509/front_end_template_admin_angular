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
        { title: values['PH2']['qlbbbg'], link: '/pages/PH2/qlbbbg' },
        {
          title: values['PH2']['qlhsdbg'],
          link: '/pages/PH2/qlhsdbg',
        },
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
          title: values['PH3']['qlbbthhtl'],
          link: '/pages/PH3/qlbbthhtl',
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
      title: values['PH6']['title'],
      children: [
        {
          title: values['PH6']['qlndnb'],
          link: '/pages/PH6/qlndnb',
        },
        {
          title: values['PH6']['qlnnd'],
          link: '/pages/PH6/qlnnd',
        },
        {
          title: values['PH6']['qlvt'],
          link: '/pages/PH6/qlvt',
        },
        {
          title: values['PH6']['qlpb'],
          link: '/pages/PH6/qlpb',
        },
        {
          title: values['PH6']['qlnk'],
          link: '/pages/PH6/qlnk',
        }        
      ],
      link: '/pages/PH6',
      menuIcon: 'icon icon-modify',
    },
  ];
}
