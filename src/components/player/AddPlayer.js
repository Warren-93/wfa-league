import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axiosConfig from '../../api/axiosConfig';

const AddPlayer = () => {
    const [teams, setTeams] = useState([]);
    const [player, setPlayer] = useState({
        teamName: '',
        name: '',
        squad_number: '',
        position: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axiosConfig.get('teams/allTeams')
            .then(response => setTeams(response.data))
            .catch(error => console.error('Error fetching teams:', error)); 
    }, []);

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!player.teamName) newErrors.teamName = 'Team is required';
        if (!player.name) newErrors.name = 'Player name is required';
        if (!player.squad_number) {
            newErrors.squad_number = 'Squad number is required';
        } else if (!Number.isInteger(Number(player.squad_number))) {
            newErrors.squad_number = 'Squad number must be a valid integer';
        }
        if (!player.position) newErrors.position = 'Position is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('https://warriorsfootballassociation-api.onrender.com/api/v1/players/createPlayer', player, { params: { teamName: player.teamName } })
                .then(response => {
                    console.log(response);
                    setSuccess('Player created successfully!');
                    setPlayer({ teamName: '', name: '', squad_number: '', position: '' });
                    setErrors({});
                })
                .catch(error => {
                    console.error('Error creating player:', error);
                    setErrors({ form: 'An error occurred while creating the player.' });
                });
        }
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Create Player</h2>
                    {success && <Alert variant="success">{success}</Alert>}
                    {errors.form && <Alert variant="danger">{errors.form}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTeamName" className="mb-3">
                            <Form.Label>Team</Form.Label>
                            <Form.Control
                                as="select"
                                name="teamName"
                                value={player.teamName}
                                onChange={handleChange}
                                isInvalid={!!errors.teamName}
                            >
                                <option value="">Select a team</option>
                                {teams.map((team) => (
                                    <option key={team.teamName} value={team.teamName}>
                                        {team.teamName}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.teamName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Player Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter player name"
                                value={player.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSquadNumber" className="mb-3">
                            <Form.Label>Squad Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="squad_number"
                                placeholder="Enter squad number"
                                value={player.squad_number}
                                onChange={handleChange}
                                isInvalid={!!errors.squad_number}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.squad_number}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPosition" className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="position"
                                placeholder="Enter position"
                                value={player.position}
                                onChange={handleChange}
                                isInvalid={!!errors.position}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.position}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Player
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPlayer;
