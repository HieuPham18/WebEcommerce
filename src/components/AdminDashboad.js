import CottageIcon from '@mui/icons-material/Cottage';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PaidIcon from '@mui/icons-material/Paid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import '../stylesheets/test.scss'
import '../stylesheets/AdminUpdateLoading.scss'
import '../stylesheets/AdminDashboad.scss'
import { Bar } from 'react-chartjs-2'
import CalendarAdmin from './Calendar'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function AdminDashBoad({ title }) {

    return (
        <>
            <div className='admin-heading'>
                <div className='admin-heading-left'>
                    <CottageIcon sx={{ fontSize: 24, color: '#00483d' }} />
                    <h2>Admin</h2>
                    <ArrowRightIcon sx={{ fontSize: 16 }} />
                    <h2 style={{ textAlign: 'center', fontWeight: 600, color: 'green' }}>
                        {
                            title === 'dashboad' ? 'Thông tin chung' : ''
                        }
                    </h2>
                </div>
                <div className='admin-heading-right'>
                    <div>
                        {/* Filter */}
                        {/* <Select style={{ display: 'block', width: 200, padding: 2 }} options={options} onChange={(value) => selectInput(value)} /> */}
                    </div>
                </div>
            </div>
            {/* Component  */}
            <div className='dashboad-list-info'>
                <div className='dashboad-item'>
                    <div className='dashboad-item-info'>
                        <div>
                            <h3 className='dashboad-item-title'>Sản phẩm</h3>
                            <h2>150</h2>
                        </div>
                        <div>
                            <div>
                                <CollectionsBookmarkIcon sx={{ fontSize: 40 }} />
                            </div>
                        </div>
                    </div>
                    <div className='dashboad-item-rate'>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                            <p style={{ marginLeft: 2 }}>18%</p>
                            <div style={{ marginLeft: 10 }}> Since last month</div>
                        </div>
                    </div>
                </div>
                <div className='dashboad-item'>
                    <div className='dashboad-item-info'>
                        <div>
                            <h3 className='dashboad-item-title'>Đơn hàng</h3>
                            <h2>890</h2>
                        </div>
                        <div>
                            <div>
                                <ShoppingCartIcon sx={{ fontSize: 40 }} />
                            </div>
                        </div>
                    </div>
                    <div className='dashboad-item-rate'>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                            <p style={{ marginLeft: 2 }}> 20%</p>
                            <div style={{ marginLeft: 10 }}> Since last month</div>
                        </div>
                    </div>
                </div>
                <div className='dashboad-item'>
                    <div className='dashboad-item-info'>
                        <div>
                            <h3 className='dashboad-item-title'>Khách hàng</h3>
                            <h2>2560</h2>
                        </div>
                        <div>
                            <div>
                                <GroupIcon sx={{ fontSize: 40 }} />
                            </div>
                        </div>
                    </div>
                    <div className='dashboad-item-rate'>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                            <p style={{ marginLeft: 2 }}>34%</p>
                            <div style={{ marginLeft: 10 }}> Since last month</div>
                        </div>
                    </div>
                </div>
                <div className='dashboad-item'>
                    <div className='dashboad-item-info'>
                        <div>
                            <h3 className='dashboad-item-title'>Doanh thu</h3>
                            <h2>8600$</h2>
                        </div>
                        <div>
                            <div>
                                <PaidIcon sx={{ fontSize: 40 }} />
                            </div>
                        </div>
                    </div>
                    <div className='dashboad-item-rate'>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                            <p style={{ marginLeft: 2 }}>26%</p>
                            <div style={{ marginLeft: 10 }}> Since last month</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: "60%", marginTop: 20 }}>
                    <Bar
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                                {
                                    label: 'Products',
                                    data: [50, 62, 80, 95, 105, 150],
                                    backgroundColor: '#229954',
                                    barThickness: 12
                                },
                                {
                                    label: 'Orders',
                                    data: [255, 190, 170, 368, 688, 766],
                                    backgroundColor: '#E67E22',
                                    barThickness: 12
                                },
                                {
                                    label: 'Customers',
                                    data: [150, 200, 340, 410, 450, 500],
                                    backgroundColor: '#839192',
                                    barThickness: 12
                                },
                            ]
                        }}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Statistical chart by month"
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        }}
                    >
                    </Bar>
                </div>
                <div style={{ width: "40%", marginLeft: 20, marginTop: 50, }}>
                    <CalendarAdmin />
                </div>
            </div>

        </>
    )
}

export default AdminDashBoad