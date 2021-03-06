import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { CardContent } from '@material-ui/core'
import OnboardForm from './OnboardForm'
import { connect } from 'react-redux'

import { onboardRequest as onboardRequestAction } from '../../actions/onboard'
import { OnboardWithVendorThingIDRequest } from 'thing-if'
import { getLoginUser, getOnboardedThing } from '../../common/utils'

class Onboard extends React.PureComponent {
  render () {
    const { onboardRequest, submitting } = this.props
    return (
      <Card>
        <CardHeader title="Onboard a Thing" />
        <CardContent>
          <OnboardForm
            onSubmit={ (formValue) => {
              const { userID, token } = getLoginUser()
              const requestObj = new OnboardWithVendorThingIDRequest(
                formValue.vendorThingID,
                formValue.password,
                'USER:' + userID,
                formValue.thingType,
                formValue.firmwareVersion)
              onboardRequest(
                userID,
                token,
                requestObj
              )
            }}
            submitting={submitting}
            intialFormValues={getOnboardedThing() || {} }
          />
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  submitting: state.onboard.isLoading,
})

export default connect(
  mapStateToProps,
  {
    onboardRequest: onboardRequestAction
  })(Onboard)
