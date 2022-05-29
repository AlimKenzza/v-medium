export interface Result {
    eventId: number,
    eventName: string,
    description: string,
    createdAt:  string,
    deadline: string,
    endDate: string,
    volunteeringCategory: number,
    isFinished: boolean,
    organizationId: number,
    volunteerIds: any[],
    image: string,
    location: string,
    region: number
}