import React from 'react'
import styled from 'styled-components'

export default class Button extends React.Component {
	render() {
		return (
			<ButtonWrap>{this.props.children}</ButtonWrap>
		)
	}
}

const ButtonWrap = styled.button `
	padding: 10px;
	color: white;
	background: green;
`