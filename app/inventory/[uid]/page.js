"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/firebase/fire';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
} from '@mui/material';
import { AddCircleOutline, ExitToApp, Delete, Edit, Search } from '@mui/icons-material';

export default function InventoryPage() {
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState('');
  
  const { currentUser } = useAuth();

  const pantryItems = [
    {
      category: "Baking Supplies",
      items: ["Flour", "Sugar", "Baking Powder", "Baking Soda", "Yeast", "Cocoa Powder", "Cornstarch", "Vanilla Extract"]
    },
    {
      category: "Canned Goods",
      items: ["Canned Vegetables", "Canned Fruits", "Canned Beans", "Canned Soup", "Tomato Sauce/Paste", "Canned Fish (Tuna, Salmon)"]
    },
    {
      category: "Condiments",
      items: ["Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce", "Salad Dressings"]
    },
    {
      category: "Grains and Pasta",
      items: ["Rice", "Pasta (Spaghetti, Macaroni, etc.)", "Quinoa", "Oats", "Couscous", "Barley"]
    },
    {
      category: "Spices and Seasonings",
      items: ["Salt", "Pepper", "Garlic Powder", "Onion Powder", "Paprika", "Cumin", "Cinnamon", "Oregano", "Basil"]
    },
    {
      category: "Oils and Vinegars",
      items: ["Olive Oil", "Vegetable Oil", "Canola Oil", "Coconut Oil", "Apple Cider Vinegar", "Balsamic Vinegar", "White Vinegar"]
    },
    {
      category: "Snacks",
      items: ["Crackers", "Chips", "Popcorn", "Nuts", "Dried Fruits", "Granola Bars"]
    },
    {
      category: "Breakfast Items",
      items: ["Cereal", "Pancake Mix", "Maple Syrup", "Oatmeal"]
    },
    {
      category: "Beverages",
      items: ["Tea", "Coffee", "Juice", "Soda", "Bottled Water"]
    },
    {
      category: "Soups and Broths",
      items: ["Chicken Broth", "Beef Broth", "Vegetable Broth", "Instant Soup Mixes"]
    },
    {
      category: "Sauces and Dressings",
      items: ["Pasta Sauce", "BBQ Sauce", "Pesto", "Ranch Dressing"]
    },
    {
      category: "Frozen Items",
      items: ["Frozen Vegetables", "Frozen Fruits", "Frozen Meat"]
    },
    {
      category: "Dairy Substitutes",
      items: ["Almond Milk", "Soy Milk", "Coconut Milk"]
    },
    {
      category: "Miscellaneous",
      items: ["Peanut Butter", "Jelly/Jam", "Honey", "Nutella"]
    }
  ];
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!itemName || !quantity || !expirationDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const uid = currentUser.uid;
      await addDoc(collection(db, `inventory/${uid}/items`), {
        itemName,
        quantity: Number(quantity),
        expirationDate,
      });

      const querySnapshot = await getDocs(collection(db, `inventory/${uid}/items`));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(items);

      setItemName('');
      setQuantity('');
      setExpirationDate('');
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item: ' + error.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const uid = currentUser.uid;
      await deleteDoc(doc(db, `inventory/${uid}/items`, itemId));

      const querySnapshot = await getDocs(collection(db, `inventory/${uid}/items`));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(items);
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item: ' + error.message);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const uid = currentUser.uid;
      await updateDoc(doc(db, `inventory/${uid}/items`, editItemId), {
        itemName,
        quantity: Number(quantity),
        expirationDate,
      });

      const querySnapshot = await getDocs(collection(db, `inventory/${uid}/items`));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(items);

      setEditDialogOpen(false);
      setItemName('');
      setQuantity('');
      setExpirationDate('');
      setEditItemId(null);
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item: ' + error.message);
    }
  };

  const handleEditClick = (item) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setExpirationDate(item.expirationDate);
    setEditItemId(item.id);
    setEditDialogOpen(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const fetchInventory = async () => {
      try {
        const uid = currentUser.uid;
        const querySnapshot = await getDocs(collection(db, `inventory/${uid}/items`));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInventory(items);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [currentUser, router]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Inventory for User: {currentUser?.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Search />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                sx={{ ml: 1 }}
              />
            </Box>
            <IconButton edge="end" color="inherit" onClick={() => router.push('/logout')}>
              <ExitToApp />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Item Name</InputLabel>
                <Select
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  renderValue={(selected) => selected || "Select an item"}
                >
                  {pantryItems.map((category) => (
                    category.items.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Expiration Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutline />}
                fullWidth
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Current Inventory
          </Typography>
          <List>
            {filteredInventory.map((item, index) => (
              <ListItem key={item.id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={item.itemName}
                  secondary={`Quantity: ${item.quantity}, Expiration Date: ${item.expirationDate}`}
                />
                {index < filteredInventory.length - 1 && <Divider />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below to edit the item.
          </DialogContentText>
          <Box component="form" onSubmit={handleEdit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Item Name</InputLabel>
                  <Select
                   label="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    renderValue={(selected) => selected || "Select an item"}
                  >
                    {pantryItems.map((category) => (
                      category.items.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Expiration Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
