import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const FiltersGroup = props => {
  const {changeEmployeeType, changeSalaryRange} = props

  const renderEmploymentType = () => (
    <div className="employment-type-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(eachType => (
          <li className="filter-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              className="check-input"
              onChange={() => changeEmployeeType(eachType.employmentTypeId)}
            />
            <label htmlFor={eachType.employmentTypeId} className="check-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="salary-range-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(eachRange => (
          <li className="filter-item" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              id={eachRange.salaryRangeId}
              className="check-input"
              onChange={() => changeSalaryRange(eachRange.salaryRangeId)}
            />
            <label htmlFor={eachRange.salaryRangeId} className="check-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderEmploymentType()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}
export default FiltersGroup
