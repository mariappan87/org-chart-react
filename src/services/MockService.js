export const getOrganizationData = async () => {
    const response = await fetch('https://run.mocky.io/v3/c90538da-4279-41df-a781-2f47914ae034');
    return await response.json();
}