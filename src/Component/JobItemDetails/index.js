import {Component} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        title: data.job_details.title,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobData: updatedJobDetails,
        similarJobsData: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData

    return (
      <div className="job-details-success-view">
        <div className="job-item-details-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />

            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>

              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>

              <div className="employee-type-container">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="employee-type">{employmentType}</p>
              </div>
            </div>

            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="line" />

          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>

            <a
              href={companyWebsiteUrl}
              className="visit-link"
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <BiLinkExternal />
            </a>
          </div>

          <p className="description-text">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>

          <ul className="skills-list">
            {skills.map(skill => (
              <SkillsCard key={skill.name} skillDetails={skill} />
            ))}
          </ul>

          <div className="life-at-company-container">
            <div className="life-at-company-content">
              <h1 className="life-at-company-heading">Life at Company</h1>

              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
            </div>

            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>

        <ul className="similar-jobs-list">
          {similarJobsData.map(each => (
            <SimilarJobItem key={each.id} jobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="job-details-error-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>

      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>

      <button type="button" className="retry-button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots
        height="50"
        width="50"
        color="#ffffff"
        ariaLabel="three-dots-loading"
      />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />

        <div className="job-item-details-bg-container">
          {(() => {
            switch (apiStatus) {
              case apiStatusConstants.success:
                return this.renderJobDetailsView()

              case apiStatusConstants.failure:
                return this.renderFailureView()

              case apiStatusConstants.inProgress:
                return this.renderLoadingView()

              default:
                return null
            }
          })()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
