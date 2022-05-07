// slugAdmin
import { useParams } from 'react-router-dom'
import CottageIcon from '@mui/icons-material/Cottage';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../stylesheets/test.scss'
import '../stylesheets/AdminUpdateLoading.scss'


function AdminUpdate({ title }) {
    console.log('title: ', title)
    return (
        <>
            <div className='admin-heading'>
                <div className='admin-heading-left'>
                    <CottageIcon sx={{ fontSize: 24 }} />
                    <h2>Admin</h2>
                    <ArrowRightIcon sx={{ fontSize: 16 }} />
                    <h2 style={{ textAlign: 'center', fontWeight: 600 }}>
                        {/* {title} */}
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
            <div>
                <div className="ring">Update<span className='admin-load'></span></div>
                <h2 style={{ width: '100%', textAlign: 'center', marginTop: -100 }}>
                    Chức năng đang được cập nhật...
                </h2>
            </div>
        </>
    )
}

export default AdminUpdate