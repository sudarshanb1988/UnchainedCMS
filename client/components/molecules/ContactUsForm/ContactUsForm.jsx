/* @flow weak */

/*
 * Component: ContactUsForm
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// External Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, { Component } from 'react';
import { Modal, Label, Input, TextArea, Form, Button, Message, Heading } from 'unchained-ui-react';
import { pushToDataLayer } from 'analytics';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Internal Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import {
  email as emailRegExp,
  USACanadaPhone as phoneRegExp,
  name as nameRegExp,
} from 'constants/regex';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Component Definition
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class ContactUsForm extends Component {
  props: {
    clearErrorMessage: () => void,
    closeContactUsForm: () => void,
    mountPoint: '',
    contactUsFormType: '',
    eventConference: {},
    reqPara: {}
  };

  static defaultProps = {
  };

  state = {
    email: '',
    emailErr: '',
    firstname: '',
    firstnameErr: '',
    phone: '',
    phoneErr: '',
    company: '',
    lastname: '',
    disableSubmitBtn: false,
    error: false,
    contactUsFormType: 'contactus',
    eventConference: {},
    doesErrorMessageNeed: false
  };

  componentWillMount() {
    const { contactUsFormType, eventConference } = this.props;
    if (eventConference) {
      this.setState({ eventConference });
    }
    this.prefilForm();
    this.setState({ isContactUsFormOpen: true, contactUsFormType });
  }

  prefilForm = () => {
  }

  componentWillReceiveProps(nextProps) {
    this.prefilForm();
    this.setState({ contactUsFormType: nextProps.contactUsFormType, eventConference: nextProps.eventConference });
  }

  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  handleInputChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
      [`${name}Err`]: '',
      error: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { email, firstname, lastname, phone, company } = this.state;
    let firstnameErr = '', emailErr = '', phoneErr ='', lastnameErr ='', companyErr =''; // eslint-disable-line

    const { clearErrorMessage, eventConference } = this.props;

    clearErrorMessage();

    if (!nameRegExp.test(firstname)) {
      firstnameErr = 'Please enter a valid first name';
    }

    if (!nameRegExp.test(lastname)) {
      lastnameErr = 'Please enter a valid last name';
    }

    if (company === '') {
      companyErr = 'Please enter a valid company name';
    }

    if (email === '' || !(emailRegExp.test(email))) {
      emailErr = 'Please enter a valid email address';
    }

    if (phone === '' || !(phoneRegExp.test(phone))) {
      phoneErr = 'Please enter a valid phone number';
    }

    this.setState({ firstnameErr, emailErr, phoneErr, lastnameErr, companyErr });
    if (firstnameErr || emailErr || phoneErr || lastnameErr || companyErr) return null;

    this.setState({
      disableSubmitBtn: true,
    });

    if (onSubmitConference) {
      const activeFilters = this.props.reqPara || '';
      const gtmdata = this.props.reqPara ? { analystName: eventConference.presenter, activeFilters } : { analystName: eventConference.presenter };
      pushToDataLayer('profile', 'requestForEvent', { category: 'Profile Calender', action: 'Attend Event', label: eventConference.title || '', data: gtmdata });
      const data = {
        email,
        first_name: firstname,
        last_name: lastname,
        phone,
        company,
        salesforce_id: eventConference.sfId,
      };
      onSubmitConference(data);
    }

    this.errorCheck();
    return null;
  }

  errorCheck = () => {
    this.setState({ disableSubmitBtn: false });
  }

  onClickOfClose = () => () => {
    this.props.closeContactUsForm();
  }

  render() {
    const {
      closeContactUsForm,
      mountPoint,
    } = this.props;

    const {
      firstnameErr,
      firstname,
      lastname,
      disableSubmitBtn,
      emailErr,
      email,
      phoneErr,
      phone,
      company,
      companyErr,
      lastnameErr,
      error,
      isContactUsFormOpen,
      contactUsFormType,
      eventConference,
      doesErrorMessageNeed
    } = this.state;
    const isDisabled = !((!firstnameErr) && (!emailErr) && (!phoneErr) && (!companyErr) && !(lastnameErr) && !disableSubmitBtn && !error && firstname && lastname && email && phone && company);
    return (
      <div className="contact-us-form">
        <Modal
          open={isContactUsFormOpen}
          className="contact-us-form"
          mountNode={mountPoint}
          onClose={closeContactUsForm}
          closeOnRootNodeClick={false}
        >
          <Modal.Content className="contact-us-form-content">
            <div className="contact-us-form-heading">
              <div className="button-holder">
                <Button className="ui button modal-close-icon bmo-close-btn" onClick={this.onClickOfClose()} />
              </div>
              {contactUsFormType === 'contactus' ?
                <div className="form-name">
                  Contact Us
                </div>
                :
                <div className={'conference-top-section'}>
                  <div className={'conference-date'}>
                    <span>{eventConference ? eventConference.event : ''}</span>
                    <div className={'seperator-dot'}>{' • '}</div>
                    <span>{eventConference ? eventConference.date : ''}</span>
                  </div>
                  <Heading as={'h3'} className={'title'} content={eventConference ? eventConference.title : ''} />
                  <Heading as={'h5'} className={'info'} content={eventConference ? eventConference.info : ''} />
                </div>
              }
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                { doesErrorMessageNeed && <Message negative content={''} />}
                { firstnameErr && <Message className={'error-text'} content={firstnameErr} /> }
                <Label className={`input-label ${firstnameErr || error ? 'error' : ''}`}> First Name </Label>
                <Input className={firstnameErr ? 'error' : ''} input={{ value: firstname }} onChange={this.handleInputChange('firstname')} />
              </Form.Field>
              <Form.Field>
                { lastnameErr && <Message className={'error-text'} content={lastnameErr} /> }
                <Label className={`input-label ${lastnameErr || error ? 'error' : ''}`}> Last Name </Label>
                <Input className={lastnameErr ? 'error' : ''} input={{ value: lastname }} onChange={this.handleInputChange('lastname')} />
              </Form.Field>
              <Form.Field>
                { emailErr && <Message className={'error-text'} content={emailErr} /> }
                <Label className={`input-label ${emailErr || error ? 'error' : ''}`}> Email Address </Label>
                <Input className={emailErr ? 'error' : ''} input={{ value: email }} onChange={this.handleInputChange('email')} />
              </Form.Field>
              <Form.Field>
                { phoneErr && <Message className={'error-text'} content={phoneErr} /> }
                <Label className={`input-label ${phoneErr || error ? 'error' : ''}`}> Phone </Label>
                <Input className={phoneErr ? 'error' : ''} input={{ value: phone }} onChange={this.handleInputChange('phone')} />
              </Form.Field>
              <Form.Field>
                { companyErr && <Message className={'error-text'} content={companyErr} /> }
                <Label className={`input-label ${companyErr || error ? 'error' : ''}`}> Company </Label>
                <Input className={companyErr ? 'error' : ''} input={{ value: company }} onChange={this.handleInputChange('company')} />
              </Form.Field>
              <Form.Field>
                <Label className="input-label"> Comments (Optional) </Label>
                <TextArea className={'comment'} onChange={this.handleInputChange('comment')} />
              </Form.Field>
              <Button type={'submit'} disabled={isDisabled} secondary size={'medium'}>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default ContactUsForm;
